import { Button, Result } from 'antd'
import React from 'react'

export const DefaultComp = (props) => {
    return (
        <div className = 'text-center'>
         <Result
            status="404"
            title="404"
            subTitle="عذرا، غير مسموح لك بالدخول إلى هذه الصفحة."
            extra={<Button onClick = {() => props.history.push('/')} type="primary">العودة الى الرئيسية</Button>}
        />
            
            
                   
         </div>
    )
}
