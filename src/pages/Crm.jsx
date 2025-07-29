import { Button, Typography } from "@mui/material";
import MainLayout from "~/components/Layout/MainLayout";
import { authAPI } from "~/apis/Systems/authAPI";
import FileUploader from "~/components/Forms/FileUploader";
import FileUploadDropzone from "~/components/Forms/FileUploadDropzone";
import { useDispatch, useSelector } from "react-redux";
import { Ward_Getlist } from "~/redux/Catalogs/wardSlice";
import { Departments_Getlist } from "~/redux/Catalogs/departmentsSlice";
import { AgentLocal_Getlist } from "~/redux/Catalogs/agentLocalSlice";
import { Province_Getlist } from "~/redux/Catalogs/provinceSlice";
import { Position_Getlist } from "~/redux/Catalogs/positionSlice";
import { Privilege_Getlist } from "~/redux/Systems/privilegeSlice";
import { PrivilegeProfile_GetPrid } from "~/redux/Systems/privilegeProfileSlice";
import { useEffect } from "react";
import Chat from "~/components/Forms/Chat";

function Crm() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.privilege?.items);

  useEffect(() => {
    dispatch(Privilege_Getlist());
  }, [dispatch]);

  console.log("🚀 ~ Crm ~ privilege:", items);

  return (
    <>
      <MainLayout>
        {/* <FileUploader /> */}
        {/* <FileUploadDropzone /> */}
        <Chat />
      </MainLayout>
    </>
  );
}

export default Crm;
