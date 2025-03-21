import React from 'react'

interface LoginAlertProps {
    lastLoginTime: string;
    currentLoginTime: string;
    lastLoginIP: string;
    currentLoginIP: string;
  }
  

  export function LoginAlert(props: LoginAlertProps) {
    const { lastLoginTime, currentLoginTime, lastLoginIP, currentLoginIP } = props;
  
    const last = new Date(lastLoginTime);
    const current = new Date(currentLoginTime);
    const diffInDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  
    const showAlert = diffInDays > 7 || lastLoginIP !== currentLoginIP;
    
    //currently null to just turn off during devlopment
    if (showAlert) return null;
  
    return (
      <div className="p-4 border border-red-500 rounded-md bg-red-100 text-red-800">
        ⚠️ We noticed a login from a new location or device.
      </div>
    );
  }
  

export default LoginAlert