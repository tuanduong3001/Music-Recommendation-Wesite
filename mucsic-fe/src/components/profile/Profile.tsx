import React from "react";
import { MainWrap } from "../../styled/MusicSection";
import { useAppDispatch, useAppSelector } from "../../stores/hook";
import { setChangePassword } from "../../reducers/auth";
const Profile = () => {
    const user = useAppSelector((state: any) => state.auth.user);

    return (
        <MainWrap>
              <div style={{width: "100%", padding: "30px"}}>
                <div className="categories-title" style={{marginBottom: "40px",
             color: "#fff", fontSize: "24px"}}>Thông tin cá nhân</div>
                <div className="profile" style={{
                    display: "flex",
                    alignItems:"center",
                    justifyContent: "center"
                    
                }}>
                    <img src={user && user.avatar} alt={user && user.name} style={{
                        borderRadius: "50%",
                        background: "transparent",
                        border: "none",
                        marginRight: "50px"
                    }}/>
                    <div className="profile-info">
                        <div className="title" style={{
                            color: "#fff",
                            fontSize: "1.5rem"
                        }}>Thông tin cá nhân</div>
                        <div className="profile-name" style={{margin: "20px 0"}}>Họ và tên : {user && user.name}</div>
                        <div className="profile-email" style={{margin: "20px 0"}}>Email : {user && user.email}</div>
                        <div className="profile-dateOfBirth" style={{margin: "20px 0"}}>Ngày sinh : {user && user.dateOfBirth.split("T")[0]}</div>
                        <div className="profile-gender" style={{margin: "20px 0"}}>Giới tính : {user && user.gender === 1 ? "Nam" : "Nữ" }</div>
                     
                    </div>
                </div>
             </div>
        </MainWrap>
    )
}

export default Profile;