import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  tools: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
  },
}));

export default function Settings() {
  const classes = useStyles();

  const handleSuspensionShow = React.useCallback(() => {
    ipcRenderer.send('showSuspension');
  }, []);
  const handleSuspensionHide = React.useCallback(() => {
    ipcRenderer.send('hideSuspension');
  }, []);

  return (
    <div className={classes.root}>
      settings
      <Button onClick={handleSuspensionShow}>打开悬浮</Button>
      <Button onClick={handleSuspensionHide}>关闭悬浮</Button>
    </div>
  );
}