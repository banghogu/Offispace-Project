import MainContainer from '@/components/shared/MainContainer';
import MeetingRoomInfo from '@/components/reservation/meetingRoom/MeetingRoomInfo';
import Footer from '@/components/footer/Footer';

const MeetingRoomDetailPage = () => {

  return (
    <MainContainer>
        <MeetingRoomInfo />
        <Footer/>
    </MainContainer>
  );
};

export default MeetingRoomDetailPage;
