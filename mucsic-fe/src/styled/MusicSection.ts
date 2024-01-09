import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/system';

export const MainWrap = styled(Box)<BoxProps>(() => ({
  minHeight: 'calc(((100vh - 64px) - 90px) - 519px)',
  paddingTop: '24px',
}));

export const MusicWrap = styled(Box)<BoxProps>(() => ({
  gap: '24px',
  flexFlow: 'row wrap',
  display: 'flex',
  padding: '0 32px',
}));
export const MusicSectionWrap = styled(Box)<BoxProps>(() => ({
  flexBasis: '100%',
  flex: '1 1 auto',
  marginBottom: '16px',
  maxWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  contentVisibility: 'auto',
  position: 'relative',
}));
export const MusicTitleWrap = styled(Box)<BoxProps>(() => ({
  width: '100%',
  display: 'flex',
  marginBottom: '16px',
}));
export const MusicTitle = styled(Box)<BoxProps>(() => ({
  display: 'block',
  flexGrow: 1,
  minWidth: 0,
}));

export const MusicLinkShowAll = styled(Box)<BoxProps>(() => ({
  fontSize: '0.875rem',
  fontWeight: 700,
  color: '#b3b3b3',
}));

export const MusicListWrap = styled(Box)<BoxProps>(() => ({
  minWidth: '418px',
  display: 'grid',
  gridGap: '24px',
  gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
  overflow: 'hidden',
  gridTemplateRows: '1fr',
  marginBottom: '50px',
}));

export const MusicItemWrap = styled(Box)<BoxProps>(() => ({
  background: '#181818',
  padding: '16px',
  borderRadius: '24px',
  cursor: 'pointer',
  position: 'relative',
  transition: 'background-color .3s ease',
  width: '100%',
}));
export const MusicItem = styled(Box)<BoxProps>(() => ({
  height: '100%',
}));
export const MusicItemImageWrap = styled(Box)<BoxProps>(() => ({
  marginBottom: '16px',
  overflow: 'hidden',
  borderRadius: '24px',
  position: 'relative',
}));
export const MusicItemImage = styled(Box)<BoxProps>(() => ({
  width: '100%',
  paddingBottom: '100%',
  borderRadius: '24px',
  position: 'relative',
  backgroundColor: '#68798A',
  boxShadow: 'box-shadow: 0 8px 24px rgb(0 0 0 / 50%)',
}));
export const MusicInfoWrap = styled(Box)<BoxProps>(() => ({
  width: '100%',
  minHeight: '62px',
}));
export const MusicInfoTitle = styled(Box)<BoxProps>(() => ({
  fontSize: '0.875rem',
  fontWeight: 400,
  color: '#a7a7a7',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  marginTop: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
