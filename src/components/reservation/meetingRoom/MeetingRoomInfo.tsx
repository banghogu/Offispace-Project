import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getMeetingRoomInfo } from '@/api/reservation/getMeetingRoomInfo';
import { MeetingRoomInfo as MeetingRoomInfoType } from "@/api/types/room";
import Image from "next/image";
import { IoIosArrowRoundBack } from 'react-icons/io';
import MeetingRoomDatePickerModal from './MeetingRoomDatePicker';
import { useBranchStore2 } from '@/store/reserve.store';
import { getSelectedOfficeInfo } from '@/api/map/getSelectedOffice';
import { Reserve } from '@/api/types/reserve';
import { reserveMeetingRoom } from '@/api/reservation/reserveMeetingRoom';
import ReservationModal from './ReservationModal'; 

const MeetingRoomInfo = () => {
    const [meetingRoom, setMeetingRoom] = useState<MeetingRoomInfoType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [initialStartTime, setInitialStartTime] = useState<Date>(new Date());
    const [initialEndTime, setInitialEndTime] = useState<Date>(new Date());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null); 
    const [eventName, setEventName] = useState('');
    const [showReservationModal, setShowReservationModal] = useState(false); 
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [storedGetTime, setStoredGetTime] = useState('');
    const [storedStartTime, setStoredStartTime] = useState('');
    const [storedEndTime, setStoredEndTime] = useState('');
    const [storedMeetingRoomId, setStoredMeetingRoomId] = useState('');
    const [formattedGetTime, setFormattedGetTime] = useState('');
    const [formattedStartTime, setFormattedStartTime] = useState('');
    const [formattedEndTime, setFormattedEndTime] = useState('');
    
    const handleImageClick = () => {
        inputRef.current?.focus();
    };

    const selectedBranch = useBranchStore2((state) => state.reservedBranch);

    const router = useRouter();

    const { meetingRoomId } = router.query;


    useEffect(() => {
        const getTimes = router.query.startTime as string;
        const startsTime = router.query.startedAt as string;
        const endsTime = router.query.endedAt as string;
        const { meetingRoomId } = router.query;

        if (getTimes && startsTime && endsTime && meetingRoomId) {
            localStorage.setItem('getAt', getTimes);
            localStorage.setItem('startedAt', startsTime);
            localStorage.setItem('endedAt', endsTime);
            localStorage.setItem('meetingRoomId', meetingRoomId as string);

            setStoredGetTime(getTimes);
            setStoredStartTime(startsTime);
            setStoredEndTime(endsTime);
            setStoredMeetingRoomId(meetingRoomId as string);
        } else {
            const savedGetTime = localStorage.getItem('getAt');
            const savedStartTime = localStorage.getItem('startedAt');
            const savedEndTime = localStorage.getItem('endedAt');
            const savedMeetingRoomId = localStorage.getItem('meetingRoomId');

            if (savedGetTime && savedStartTime && savedEndTime && savedMeetingRoomId) {
                setStoredGetTime(savedGetTime);
                setStoredStartTime(savedStartTime);
                setStoredEndTime(savedEndTime);
                setStoredMeetingRoomId(savedMeetingRoomId);
            }
        }
    }, [router.query]);

    useEffect(() => {
        console.log('Stored Get Time:', storedGetTime);
        console.log('Stored Start Time:', storedStartTime);
        console.log('Stored End Time:', storedEndTime);
        console.log('Stored Meeting Room ID:', storedMeetingRoomId);

        const formattedStart = `${storedStartTime}.220Z`;
        const formattedEnd = `${storedEndTime}.220Z`;

        setFormattedStartTime(formattedStart);
        setFormattedEndTime(formattedEnd);
        setFormattedGetTime(storedGetTime);

    
        console.log('Formatted Start Time:', formattedStart);
        console.log('Formatted End Time:', formattedEnd);
    }, [storedGetTime, storedStartTime, storedEndTime, storedMeetingRoomId]);

    const handleBackClick = () => {
        router.back();
    };

    useEffect(() => {
        if (meetingRoomId) {
            getMeetingRoomInfo(meetingRoomId as string)
                .then(data => {
                    setMeetingRoom(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [meetingRoomId]);

    useEffect(() => {
        if (formattedGetTime) {
            const [date, time] = (formattedGetTime as string).split(' ');
            const [month, day] = date.split('.');
            const [start, end] = time.split('~');
            const [startHour, startMinute] = start.split(':');
            const [endHour, endMinute] = end.split(':');
            const now = new Date();

            const initialStartDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(startHour), parseInt(startMinute));
            const initialEndDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(endHour), parseInt(endMinute));

            setInitialStartTime(initialStartDate);
            setInitialEndTime(initialEndDate);
            setSelectedTimeRange(`${formattedGetTime}`); 
        }
    }, [formattedGetTime]);

    const handleConfirm = (startDate: Date, endDate: Date) => {
        const formattedStartDate = `${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')}`;
        const formattedStartTime = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;
        const formattedEndTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

        setSelectedTimeRange(`${formattedStartDate} ${formattedStartTime}~${formattedEndTime}`);

        setShowModal(false); 
    };

    const handleOfficeInfo = async () => {
        try {
            const data = await getSelectedOfficeInfo(selectedBranch!.branchName); 
            const officeInfo = data.data; 
            console.log(officeInfo);
            router.push({
                pathname: `/branches/${encodeURIComponent(selectedBranch!.branchName)}`,
                query: { 
                    name: selectedBranch!.branchName, 
                    address: officeInfo.branchAddress,
                    branchPhoneNumber: officeInfo.branchPhoneNumber,
                    roadFromStation: officeInfo.roadFromStation,
                    stationToBranch: officeInfo.stationToBranch.join(',')
                }
            }, `/branches/${encodeURIComponent(selectedBranch!.branchName)}`);
        } catch (error) {
            console.error('Error fetching office info:', error);
        }
    };

    const handleReseve = () => {   
        const reservation: Reserve = {
            reservationName: eventName,
            meetingRoomId: meetingRoom!.meetingRoomId, 
            startAt: formattedStartTime, 
            endAt: formattedEndTime,
            memberIds: [] 
        };
    
        reserveMeetingRoom(reservation)
            .then(() => {
                console.log('Meeting room reserved successfully');
                setShowReservationModal(true); 
            })
            .catch(error => {
                console.error('Error reserving meeting room:', error);
            });
    };

    if (loading) {
        return <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="loader"></div>
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!meetingRoom) {
        return <div>No meeting room data</div>;
    }


    return (
        <div>
            <div className="px-4 mt-[20px]">
                <IoIosArrowRoundBack size={40} className="mr-auto" onClick={handleBackClick} />
            </div>
            <Image
                src={meetingRoom.meetingRoomImage || '/meetingRoomSqaure.svg'}
                width={393}
                height={124}
                alt='meetingRoomImage'
                className="object-cover"
            />
            <div className='px-4'>
                <div className="flex w-full items-center mt-[24px]">
                    <div className="text-black/opacity-20 text-lg font-medium font-['Pretendard']">
                        {meetingRoom.branchName}
                    </div>
                    <div className="ml-auto flex" onClick={handleOfficeInfo}>
                        <div className="mr-[5px] text-neutral-400 text-sm font-normal font-['Pretendard'] leading-[21px]">지점 상세보기</div>
                        <Image src={'/nextArrow.svg'} width={5} height={11} alt="arrow" className="mr-[6px] mb-[2px]" />
                    </div>
                </div>
                <div className="flex flex-col w-full mt-[24px]">
                    <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard']">{meetingRoom.meetingRoomName}</div>
                    <div className="flex flex-row items-center">
                        <Image src={'/floor.svg'} width={14} height={14} alt="floor" className="mr-[6px]" />
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                            {meetingRoom.meetingRoomFloor}층
                        </div>
                        <Image src={'/capacity.svg'} width={14} height={14} alt="capacity" className="mr-[6px]" />
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                            1~{meetingRoom.meetingRoomCapacity}명
                        </div>
                        <Image src={'/check.svg'} width={14} height={14} alt="check" className="mr-[6px]" />
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mt-[2px]">
                            {meetingRoom.equipments.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[full] mt-[32px] h-1 bg-neutral-200" />
            <div className="px-4 py-2">
            <div className="flex-none w-full h-[50px] py-2 flex items-center cursor-pointer" onClick={() => console.log("Edit clicked")}>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    ref={inputRef}
                    className="w-full h-full outline-none bg-transparent"
                    placeholder="일정명을 작성하세요."
                />
                <Image
                    src={'/pencil.svg'}
                    width={14}
                    height={14}
                    alt="edit"
                    className="ml-2"
                    onClick={handleImageClick}
                />
            </div>
            </div>
            <div className="w-[full] h-0.5 bg-neutral-200" />
            <div className="flex px-4 my-4">
            <div className="text-black/opacity-20 text-base font-bold font-['Pretendard'] my-auto">일정</div>
                <div className="flex-none ml-[8px]">
                    <div className="text-indigo-700 text-base font-semibold font-['Pretendard']">
                        {selectedTimeRange ? (
                            `${selectedTimeRange}`
                        ) : (
                            '시간을 선택해주세요'
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[full] h-0.5 bg-neutral-200" />
            <footer className='w-full text-center py-[30px] fixed bottom-[70px] left-0 right-0'>
                <button className='w-[361px] h-12 bg-indigo-700 rounded-lg border border-indigo-700 text-center text-stone-50 text-[15px] font-semibold mx-auto' onClick={handleReseve}>예약하기</button>
            </footer>
            {showModal && (
                <MeetingRoomDatePickerModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    onConfirm={handleConfirm}
                    initialStartTime={initialStartTime}
                    initialEndTime={initialEndTime}
                />
            )}
            <ReservationModal
                isVisible={showReservationModal}
                eventName={eventName}
                getTimes={formattedGetTime}
                selectedBranch={meetingRoom.branchName}
                meetingRoomName={meetingRoom.meetingRoomName}
            />
        </div>
    );
};

export default MeetingRoomInfo;
