//--------------------| DEPENDENCIES |--------------------//
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

//--------------------| COMPONENTS |--------------------//
import Colors from './Colors.jsx';
import InitialDialogue from './ui/InitialDialogue.jsx';

function App() {

  return (
    <BrowserRouter>
      <InitialDialogue/>
      <motion.div
        className="flex flex-col font-thin justify-center cursor-default items-center lg:gap-10 md:gap-7 gap-4 min-h-screen"
        style={{ minHeight: '100vh', height: '100%', position: 'relative' }}
      >
        {/* Background */}
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <div className="relative h-full w-full bg-neutral-900">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#bdbdbd18_1px,transparent_1px),linear-gradient(to_bottom,#bdbdbd18_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Colors />} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
