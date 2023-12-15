import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { Box, Modal } from "@mui/material";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const actionState = {
  signin: "signin",
  signup: "signup",
};

export default function AuthModal() {
    const { authModalOpen } = useSelector((state) => state.authModal);
  const dispatch = useDispatch();
  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.signin);
  }, [authModalOpen]);

  const handelClose = () => dispatch(setAuthModalOpen(false));
  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handelClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width:"100%",
          maxWidth:"600px",
          padding:4,
          outline:"none",
        }}
      >
        <Box sx={{padding:4, boxShadow:24, backgroundColor:"background.paper"}}>
          <Box sx={{textAlign:"center", marginBottom:"2rem"}}>
            <Logo />
          </Box>
          {action === "signin" && <SigninForm switchAuthState={()=> switchAuthState(actionState.signin)} />}
          {action === "signup" && <SignupForm switchAuthState={()=> switchAuthState(actionState.signup)}  />}
        </Box>
      </Box>
    </Modal>
  );
}
