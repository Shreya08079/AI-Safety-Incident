import React from 'react';
import { Player } from 'lottie-react';
import aiAnimation from '../assets/ai-hero.json';

const HeroAnimation = () => (
  <div className="w-full flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-8 mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl shadow-lg relative overflow-hidden">
    <div className="z-10 flex-1">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in">
        Welcome to the <span className="text-blue-400">AI Safety Dashboard</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-6 animate-fade-in delay-100">
        Monitor, analyze, and respond to AI safety incidents with confidence and clarity.
      </p>
    </div>
    <div className="w-full md:w-1/3 flex justify-center z-10 animate-float">
      <Player
        autoplay
        loop
        src={aiAnimation}
        style={{ height: '220px', width: '220px' }}
      />
    </div>
    {/* Decorative blurred circle */}
    <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl z-0" />
    <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl z-0" />
  </div>
);

export default HeroAnimation; 