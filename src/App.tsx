import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Users, Settings, X, Wifi, User } from 'lucide-react';
import QRCode from 'react-qr-code';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'temporary' | 'permanent';
}

const RoomModal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  const pin = Math.random().toString().substring(2, 8);
  const qrValue = `webshare://${type}/${pin}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {type === 'temporary' ? 'Temporary Room' : 'Permanent Room'}
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-white rounded-lg">
                <QRCode value={qrValue} size={200} />
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-2">Room PIN</p>
                <p className="text-2xl font-bold tracking-wide">{pin}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [modalType, setModalType] = useState<'temporary' | 'permanent' | null>(null);
  const [username, setUsername] = useState("Salmon Silkworm");

  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            Open WebShare on other devices to send files
          </motion.h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-blue-500" />
              <p className="text-gray-700">You are known as: <span className="font-semibold">{username}</span></p>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-600">Discoverable on this network</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card-hover bg-white p-6 rounded-2xl shadow-lg text-left"
            onClick={() => setModalType('temporary')}
          >
            <Share2 className="w-8 h-8 text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pair Devices</h2>
            <p className="text-gray-600">Connect with nearby devices for quick file sharing</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card-hover bg-white p-6 rounded-2xl shadow-lg text-left"
            onClick={() => setModalType('permanent')}
          >
            <Users className="w-8 h-8 text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Enter Public Room</h2>
            <p className="text-gray-600">Be discoverable on other networks</p>
          </motion.button>
        </div>

        <footer className="text-center text-gray-600">
          <button
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white transition-colors"
            onClick={() => {
              const newUsername = prompt("Enter new username:", username);
              if (newUsername) setUsername(newUsername);
            }}
          >
            <Settings className="w-4 h-4" />
            <span>Change Username</span>
          </button>
        </footer>

        <RoomModal
          isOpen={modalType !== null}
          onClose={() => setModalType(null)}
          type={modalType || 'temporary'}
        />
      </div>
    </div>
  );
}

export default App;