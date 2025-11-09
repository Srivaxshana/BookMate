// // // import React, { useState, useEffect } from 'react';
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import Navbar from './components/Navbar';
// // // import Footer from './components/Footer';
// // // import Home from './pages/Home';
// // // import Books from './pages/Books';
// // // import Login from './pages/Login';
// // // import Signup from './pages/Signup';
// // // import Cart from './pages/Cart';
// // // import Profile from './pages/Profile';
// // // import AdminDashboard from './pages/AdminDashboard';
// // // import ProtectedRoute from './components/ProtectedRoute';

// // // function App() {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem('user');
// // //     if (storedUser) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   const handleLogin = (userData) => {
// // //     setUser(userData);
// // //     localStorage.setItem('user', JSON.stringify(userData));
// // //   };

// // //   const handleLogout = () => {
// // //     setUser(null);
// // //     localStorage.removeItem('user');
// // //   };

// // //   return (
// // //     <Router>
// // //       <div className="App">
// // //         <Navbar user={user} onLogout={handleLogout} />
// // //         <Routes>
// // //           <Route path="/" element={<Home />} />
// // //           <Route path="/books" element={<Books user={user} />} />
// // //           <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
// // //           <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
// // //           <Route 
// // //             path="/cart" 
// // //             element={
// // //               <ProtectedRoute user={user}>
// // //                 <Cart user={user} />
// // //               </ProtectedRoute>
// // //             } 
// // //           />
// // //           <Route 
// // //             path="/profile" 
// // //             element={
// // //               <ProtectedRoute user={user}>
// // //                 <Profile user={user} />
// // //               </ProtectedRoute>
// // //             } 
// // //           />
// // //           <Route 
// // //             path="/admin" 
// // //             element={
// // //               <ProtectedRoute user={user} adminOnly={true}>
// // //                 <AdminDashboard />
// // //               </ProtectedRoute>
// // //             } 
// // //           />
// // //         </Routes>
// // //         <Footer />
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import Books from './pages/Books';
// // import BookDetails from './pages/BookDetails';  // Add this import
// // import Login from './pages/Login';
// // import Signup from './pages/Signup';
// // import Cart from './pages/Cart';
// // import Profile from './pages/Profile';
// // import AdminDashboard from './pages/AdminDashboard';
// // import ProtectedRoute from './components/ProtectedRoute';

// // function App() {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       setUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   const handleLogin = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem('user', JSON.stringify(userData));
// //   };

// //   const handleLogout = () => {
// //     setUser(null);
// //     localStorage.removeItem('user');
// //   };

// //   return (
// //     <Router>
// //       <div className="App">
// //         <Navbar user={user} onLogout={handleLogout} />
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/books" element={<Books user={user} />} />
// //           <Route path="/books/:id" element={<BookDetails user={user} />} />  {/* Add this route */}
// //           <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
// //           <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
// //           <Route 
// //             path="/cart" 
// //             element={
// //               <ProtectedRoute user={user}>
// //                 <Cart user={user} />
// //               </ProtectedRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/profile" 
// //             element={
// //               <ProtectedRoute user={user}>
// //                 <Profile user={user} />
// //               </ProtectedRoute>
// //             } 
// //           />
// //           <Route 
// //             path="/admin" 
// //             element={
// //               <ProtectedRoute user={user} adminOnly={true}>
// //                 <AdminDashboard />
// //               </ProtectedRoute>
// //             } 
// //           />
// //         </Routes>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Books from './pages/Books';
// import BookDetails from './pages/BookDetails';
// import About from './pages/About';  // Add this import
// import Contact from './pages/Contact';  // Add this import
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogin = (userData) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Navbar user={user} onLogout={handleLogout} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/books" element={<Books user={user} />} />
//           <Route path="/books/:id" element={<BookDetails user={user} />} />
//           <Route path="/about" element={<About />} />  {/* Add this route */}
//           <Route path="/contact" element={<Contact />} />  {/* Add this route */}
//           <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
//           <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
//           <Route 
//             path="/cart" 
//             element={
//               <ProtectedRoute user={user}>
//                 <Cart user={user} />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <ProtectedRoute user={user}>
//                 <Profile user={user} />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/admin" 
//             element={
//               <ProtectedRoute user={user} adminOnly={true}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books user={user} />} />
          <Route path="/books/:id" element={<BookDetails user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute user={user}>
                <Cart user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

