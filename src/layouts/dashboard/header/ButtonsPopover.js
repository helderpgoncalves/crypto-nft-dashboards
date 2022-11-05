import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

const SOCIAL_BUTTONS = [
  {
    value: 'twitter',
    label: 'Twitter',
    icon: '/assets/images/buttons/twitter.png',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    icon: '/assets/images/buttons/facebook.png',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: '/assets/images/buttons/instagram.png',
  },
  {
    value: 'twitch',
    label: 'Twitch',
    icon: '/assets/images/buttons/twitch.png',
  },
];

// ----------------------------------------------------------------------

export default function ButtonsPopover() {
  const [open, setOpen] = useState(null);

  return (
    <div style={{ flexDirection: 'row', display: 'flex' }}>
      <IconButton
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          marginRight: 1,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={SOCIAL_BUTTONS[0].icon} alt={SOCIAL_BUTTONS[0].label} />
      </IconButton>
      <IconButton
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          marginLeft: 1,
          marginRight: 1,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={SOCIAL_BUTTONS[1].icon} alt={SOCIAL_BUTTONS[1].label} />
      </IconButton>
      <IconButton
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          marginLeft: 1,
          marginRight: 1,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={SOCIAL_BUTTONS[2].icon} alt={SOCIAL_BUTTONS[2].label} />
      </IconButton>
      <IconButton
        sx={{
          padding: 0,
          width: 44,
          marginLeft: 1,
          marginRight: 1,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={SOCIAL_BUTTONS[3].icon} alt={SOCIAL_BUTTONS[3].label} />
      </IconButton>
    </div>
  );
}
