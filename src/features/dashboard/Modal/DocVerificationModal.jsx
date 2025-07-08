import { useDocVerificationModalHook } from "./DocVerificationModal.Hook";
import DocLeftRight from "../components/DocLeftRight";
import VehicleImages from "../components/VehicleImages";

const DocVerificationModal = ({ lable = "Aadhar ID Card", setOpenModal }) => {
  const { detailsToShow, docImage, selectedImage, setSelectedImage } =
    useDocVerificationModalHook({
      lable,
    });

  return (
    <div className="w-full flex gap-1.5 h-full">
      {lable === "Vehicle Image" ? (
        <VehicleImages
          docImage={docImage}
          lable={lable}
          setOpenModal={setOpenModal}
        />
      ) : (
        <DocLeftRight
          detailsToShow={detailsToShow}
          docImage={docImage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          lable={lable}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default DocVerificationModal;
