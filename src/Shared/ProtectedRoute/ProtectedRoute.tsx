import { Navigate } from 'react-router-dom'

function ProtectedRoute(children: any) {
    
    //hint:
    // change name of variable: (adminData) to new name
    // and git it from context 

    if (adminData == null && localStorage.getItem("adminToken") == null) {
        return (
            <Navigate to="/login" />
        )
    } else {
        return children
    }
}

export default ProtectedRoute