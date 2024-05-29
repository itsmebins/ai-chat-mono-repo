import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useToast, ToastAlert } from '@/contexts/useToast';

const ToastAlerts: React.FC = () => {
  const { alerts, removeAlert } = useToast();

  return (
    <>
      {alerts?.map((alert: ToastAlert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => removeAlert(alert.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => removeAlert(alert.id)}
            severity={alert.type}  // 'error', 'warning', 'info', 'success'
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => removeAlert(alert.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ width: '100%' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexShrink: 0 }}>
                {/* Customize Icon based on type */}
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>{alert.title}</p>
                {alert.message && (
                  <p style={{ marginTop: 8, fontSize: '0.875rem' }}>{alert.message}</p>
                )}
              </div>
            </div>
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default ToastAlerts;
