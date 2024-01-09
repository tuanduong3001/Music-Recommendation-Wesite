import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/system";

export const MainWrap = styled(Box)<BoxProps>(() => ({
    minHeight: "calc(((100vh - 64px) - 90px) - 519px)",
    paddingTop: "24px"
  }));
