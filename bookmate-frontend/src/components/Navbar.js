// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaShoppingCart, FaUser } from 'react-icons/fa';

// // const Navbar = ({ user, onLogout }) => {
// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
// //       <div className="container">
// //         <Link className="navbar-brand" to="/">BookMate</Link>
// //         <button 
// //           className="navbar-toggler" 
// //           type="button" 
// //           data-bs-toggle="collapse" 
// //           data-bs-target="#navbarNav"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav ms-auto">
// //             <li className="nav-item">
// //               <Link className="nav-link" to="/">Home</Link>
// //             </li>
// //             <li className="nav-item">
// //               <Link className="nav-link" to="/books">Books</Link>
// //             </li>
// //             {user && user.role === 'ADMIN' && (
// //               <li className="nav-item">
// //                 <Link className="nav-link" to="/admin">Admin</Link>
// //               </li>
// //             )}
// //             {user ? (
// //               <>
// //                 <li className="nav-item">
// //                   <Link className="nav-link" to="/cart">
// //                     <FaShoppingCart /> Cart
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item dropdown">
// //                   <a 
// //                     className="nav-link dropdown-toggle" 
// //                     href="#" 
// //                     id="navbarDropdown" 
// //                     role="button" 
// //                     data-bs-toggle="dropdown"
// //                   >
// //                     <FaUser /> {user.fullName}
// //                   </a>
// //                   <ul className="dropdown-menu">
// //                     <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
// //                     <li><hr className="dropdown-divider" /></li>
// //                     <li>
// //                       <button className="dropdown-item" onClick={onLogout}>
// //                         Sign Out
// //                       </button>
// //                     </li>
// //                   </ul>
// //                 </li>
// //               </>
// //             ) : (
// //               <li className="nav-item">
// //                 <Link className="btn btn-primary-custom" to="/login">Sign In</Link>
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

// const Navbar = ({ user, onLogout }) => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
//       <div className="container">
//         <Link className="navbar-brand" to="/">BookMate</Link>
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-bs-toggle="collapse" 
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/books">Books</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>
//             {user && user.role === 'ADMIN' && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admin">Admin</Link>
//               </li>
//             )}
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/cart">
//                     <FaShoppingCart /> Cart
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/profile">
//                     <FaUser /> {user.fullName}
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <button 
//                     className="btn btn-danger-custom ms-2" 
//                     onClick={onLogout}
//                   >
//                     <FaSignOutAlt /> Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-primary-custom" to="/login">Sign In</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">BookMate</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Books</Link>
            </li>
            {user && user.role === 'ADMIN' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart /> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FaUser /> {user.fullName}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-danger-custom ms-2" 
                    onClick={onLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary-custom" to="/login">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
