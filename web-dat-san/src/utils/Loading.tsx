import { ClipLoader } from "react-spinners";
export const Loading = (loading: any) => {
  return (
    <ClipLoader
      color="#36d7b7"
      cssOverride={{ display: "block", margin: "0 auto" }}
      loading={loading}
      size={30}
    />
  );
};
