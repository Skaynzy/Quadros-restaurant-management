import heroImage from "../assets/backg.jpg";
import pizza from "../assets/pizza.jpg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
const navigate = useNavigate();

return(
    <>
    <section className="h-screen w-full bg-cover bg-center relative -mt-30"
         style={{backgroundImage: `url(${heroImage})`}}>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4 sm:px-6 lg:px-8 w-full">
            {/* Responsive text sizing */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl mb-2">
                The <span className="text-yellow-400">BEST</span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl mb-6 sm:mb-8">
                <span className="text-yellow-400">PIZZA</span> In Town
            </div>
            
            {/* Responsive button */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-800 font-bold 
                            text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                            rounded-2xl sm:rounded-3xl cursor-pointer duration-200
                            hover:bg-white hover:text-black hover:scale-105 transition-all
                            max-w-xs sm:max-w-sm md:max-w-md mx-auto
                            shadow-lg hover:shadow-xl
            " onClick={() => navigate('/products')}>
                ORDER NOW
            </div>
        </div>
    </section>

    <section className="bg-gradient-to-b from-green-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
                    <span className="text-green-700">QUADROS</span> PIZZA
                </h2>
                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-green-600 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                <div className="order-2 lg:order-1">
                    <div className="relative">
                        <img 
                            src={pizza} 
                            alt="Delicious Quadros Pizza" 
                            className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                    </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                            About Quadros Pizza
                        </h3>
                        
                        <div className="space-y-4 sm:space-y-6">
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                Quadros Pizza Alaminos is a fast food chain pizza place located in Palamis, Alaminos, Pangasinan.
                            </p>
                            
                            <div className="bg-green-100 border-l-4 border-green-600 p-4 sm:p-6 rounded-lg">
                                <p className="text-lg sm:text-xl font-semibold text-green-800 italic">
                                    "Sarap na hanap hanap hanggang sa huling slice"
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600">Fresh Ingredients</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600">Fast Service</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span className="text-xs sm:text-sm font-medium text-gray-600">Local Favorite</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center lg:text-left">
                        <button 
                            onClick={() => navigate('/products')}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold 
                                     py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base
                                     rounded-xl transform hover:scale-105 transition-all duration-200 
                                     shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            View Our Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
)
}

export default HomePage;