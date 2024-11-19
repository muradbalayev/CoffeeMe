import { useGetFingerTipsQuery } from "../../redux/services/extraApi";

const FingerTipsPage = () => {
  const { data, isLoading } = useGetFingerTipsQuery();
  console.log(data);

  return <div></div>;
};
export default FingerTipsPage;
