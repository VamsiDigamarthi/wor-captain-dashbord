import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useDocVerificationModalHook = ({ lable }) => {
  const { singleUser } = useSelector((state) => state.worUsers);
  const [docImage, setDocImage] = useState({
    frontImage: "",
    backImage: "",
    leftImage: "",
    rightImage: "",
    helmetImage: "",
    numberImage: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFilterImages = useCallback(() => {
    switch (lable) {
      case "Aadhar ID Card":
        setDocImage({
          frontImage: singleUser?.adhar ?? null,
          backImage: singleUser?.adharBack ?? null,
        });
        break;
      case "Driver's License":
        setDocImage({
          frontImage: singleUser?.license ?? null,
          backImage: singleUser?.licenseBack ?? null,
        });
        break;
      case "Vehicle RC":
        setDocImage({
          frontImage: singleUser?.services?.[0]?.rcFrontImage ?? null,
          backImage: singleUser?.services?.[0]?.rcBackImage ?? null,
        });
        break;

      case "Vehicle Image":
        setDocImage({
          frontImage: singleUser?.services?.[0]?.vehicleFrontImage ?? null,
          backImage: singleUser?.services?.[0]?.vehicleBackImage ?? null,
          leftImage: singleUser?.services?.[0]?.vehicleLeftImage ?? null,

          rightImage: singleUser?.services?.[0]?.vehicleRightImage ?? null,

          helmetImage: singleUser?.services?.[0]?.vehicleHelmetImage ?? null,
          numberImage: singleUser?.services?.[0]?.vehicleNumberPlate ?? null,
        });
        break;
      default:
        setDocImage({
          frontImage: "",
          backImage: "",
        });
    }
  }, [lable, singleUser]);

  useEffect(() => {
    handleFilterImages();
  }, [handleFilterImages, lable, singleUser]);

  useEffect(() => {
    setSelectedImage(docImage?.frontImage);
  }, [docImage]);

  const aadharCardDetails = singleUser?.aadharCardDetails;
  const rcDetails = singleUser?.services?.[0];
  const licenseDetails = singleUser?.licenseCardDetails;
  const panDetails = singleUser?.panCardDetails;

  const fieldsByLabel = {
    "Aadhar ID Card": [
      {
        label: "Name",
        value: aadharCardDetails?.fullName
          ? aadharCardDetails?.fullName
          : panDetails
          ? panDetails?.name
          : null,
      },
      { label: "DOB", value: aadharCardDetails?.dob ?? null },
      { label: "Gender", value: aadharCardDetails?.gender ?? null },
      {
        label: "Aadhar Number",
        value: aadharCardDetails?.aadhaarNumber ?? null,
      },
      { label: "Pan Numer", value: panDetails ? panDetails?.pan : null },
      { label: "Care-Of", value: aadharCardDetails?.careOf ?? null },
      { label: "Country", value: aadharCardDetails?.address?.country ?? null },
      { label: "Dist", value: aadharCardDetails?.address?.dist ?? null },
      { label: "State", value: aadharCardDetails?.address?.state ?? null },
      { label: "Mandal", value: aadharCardDetails?.address?.mandal ?? null },
      { label: "Village", value: aadharCardDetails?.address?.village ?? null },
      { label: "House", value: aadharCardDetails?.address?.house ?? null },
    ],
    "Vehicle rc": [
      { label: "Fit Up To", value: rcDetails?.fitUpTo ?? null },
      { label: "Fuel Type", value: rcDetails?.fuelType ?? null },
      {
        label: "Maker Description",
        value: rcDetails?.makerDescription ?? null,
      },
      { label: "Maker Model", value: rcDetails?.makerModel ?? null },
      { label: "Owner Name", value: rcDetails?.ownerName ?? null },
      {
        label: "Permanent Address",
        value: rcDetails?.permanentAddress ?? null,
      },
      { label: "Present Address", value: rcDetails?.presentAddress ?? null },
      { label: "Registered At", value: rcDetails?.registeredAt ?? null },
    ],
    "Driver's License": [
      { label: "License Number", value: licenseDetails?.licenseNumber ?? null },
      { label: "State", value: licenseDetails?.state ?? null },
      { label: "Name", value: licenseDetails?.name ?? null },
      {
        label: "Permanent Address",
        value: licenseDetails?.permanentAddress ?? null,
      },
      {
        label: "Temporary Address",
        value: licenseDetails?.temporaryAddress ?? null,
      },
      { label: "DOB", value: licenseDetails?.dob ?? null },
      { label: "Gender", value: licenseDetails?.gender ?? null },
    ],
  };

  return {
    detailsToShow: fieldsByLabel[lable || ""] || [],
    docImage,
    selectedImage,
    setSelectedImage,
  };
};
