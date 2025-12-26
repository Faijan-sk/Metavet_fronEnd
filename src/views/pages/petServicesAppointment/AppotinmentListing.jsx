import React from "react";
import { Calendar, Clock, Star, Check, Phone, MessageCircle, Package, TrendingUp, Award } from "lucide-react";

export default function SplitDashboard() {
  const data = [
    {
      id: 1,
      name: "Rohit Sharma",
      pet: "Bruno (Labrador)",
      rating: 4.7,
      booking: "Haircut & Shampoo",
      date: "27 Dec 2025",
      time: "04:30 PM",
      status: "pending",
      price: "₹1,200",
      image: "🐕"
    },
    {
      id: 2,
      name: "Ayesha Khan",
      pet: "Milo (Persian Cat)",
      rating: 4.9,
      booking: "Full Grooming",
      date: "28 Dec 2025",
      time: "11:00 AM",
      status: "confirmed",
      price: "₹1,800",
      image: "🐈"
    },
    {
      id: 3,
      name: "Rahul Verma",
      pet: "Sheru (German Shepherd)",
      rating: 4.5,
      booking: "Nail Trim & Bath",
      date: "27 Dec 2025",
      time: "02:00 PM",
      status: "completed",
      price: "₹900",
      image: "🐕‍🦺"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
        
        {/* LEFT SIDEBAR */}
        <div className="bg-gradient-to-br from-[#52B2AD] to-[#387d79] p-8 text-white">
          <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold">{data.length}</p>
                </div>
                <Package size={32} className="text-white/60" />
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Revenue Today</p>
                  <p className="text-3xl font-bold">₹3,900</p>
                </div>
                <TrendingUp size={32} className="text-white/60" />
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold">4.7</p>
                </div>
                <Award size={32} className="text-white/60" />
              </div>
            </div>
          </div>

          {/* QUICK STATS */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <h3 className="font-bold mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Pending</span><span className="font-bold">{data.filter(d => d.status === 'pending').length}</span></div>
              <div className="flex justify-between"><span>Confirmed</span><span className="font-bold">{data.filter(d => d.status === 'confirmed').length}</span></div>
              <div className="flex justify-between"><span>Completed</span><span className="font-bold">{data.filter(d => d.status === 'completed').length}</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Today's Appointments</h2>
           
          </div>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#52B2AD] to-[#387d79] rounded-2xl flex items-center justify-center text-3xl">
                    {item.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <span className="bg-[#52B2AD] text-white px-4 py-1 rounded-full font-bold">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.pet} • {item.booking}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={14} />{item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} />{item.time}</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" fill="currentColor" />{item.rating}</span>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition"><Check size={20} /></button>
                    <button className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition"><Phone size={20} /></button>
                    <button className="bg-gray-200 text-gray-700 p-3 rounded-xl hover:bg-gray-300 transition"><MessageCircle size={20} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
