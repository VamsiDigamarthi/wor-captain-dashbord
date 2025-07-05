import { Eye } from "lucide-react";
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { useLoginHook } from "../hooks/useLoginHook";
export default function Login() {
  const {
    handleSubmit,
    register,
    passType,
    togglePassType,
    submitForm,

    errors,
  } = useLoginHook({});
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col w-[40%]  items-center justify-center bg-white shadow-2xl p-4 gap-4"
      >
        <h2 className="font-bold text-2xl">Employee Login</h2>
        <CustomInput
          register={register}
          errors={errors}
          name={"userId"}
          label={"Email or Mobile or User Id"}
        />
        <CustomInput
          register={register}
          name={"password"}
          label={"password"}
          type={passType}
          errors={errors}
          rightElement={
            <button type="button" onClick={togglePassType}>
              <Eye />
            </button>
          }
        />
        {/* 
        <CustomInput
          errors={errors}
          label={"Captcha"}
          register={register}
          name={"Captcha"}
        /> */}
        <CustomButton type="submit" text={"Login"} />
        <div className="flex items-center justify-between w-full">
          <span>Need Help ?</span>
          <span>Contact IT Support</span>
        </div>
      </form>
    </div>
  );
}
