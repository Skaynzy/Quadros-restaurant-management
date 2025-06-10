import { MapPin, Mail, Phone } from "lucide-react";

const Contacts = () => {
    return(
        <>
        <section className="h-auto w-full justify-items-center -mt-30">
            <div className="h-30 w-full"></div>
            <div className="text-center mt-5 font-extrabold text-4xl md:text-6xl">CONTACTS</div>
            <div className="w-32 md:w-45 h-1 bg-green-600 mx-auto"></div>
            <div className="mt-5 h-0.5 bg-green-800 w-3/4"></div>

            {/* contents */}
            <div className="mt-5 w-full px-4 md:w-9/10 h-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
                {/* left contents */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center space-y-4">
                    <div className="inline-flex items-center h-auto w-full border-solid border-2 md:border-5 border-green-600 rounded-3xl p-4 md:pb-5 md:pt-5 font-bold">
                        <div className="w-12 h-12 md:w-15 md:h-15 flex items-center justify-center mr-4 md:mr-7.5 ml-2 md:ml-7.5 flex-shrink-0">
                            <MapPin className="w-8 h-8 md:w-12 md:h-12"/>
                        </div>
                        <div className="text-sm md:text-base">EJR BUSINESS CENTER-2 BUILDING, MARCOS AVENUE, PALAMIS, ALAMINOS CITY, PANGASINAN.</div>
                    </div>
                    <div className="inline-flex items-center h-auto w-full border-solid border-2 md:border-5 border-green-600 rounded-3xl p-4 md:pb-5 md:pt-5 font-bold text-lg md:text-2xl">
                        <div className="w-12 h-12 md:w-15 md:h-15 flex items-center justify-center mr-4 md:mr-7.5 ml-2 md:ml-7.5 flex-shrink-0">
                            <Phone className="w-8 h-8 md:w-12 md:h-12"/>
                        </div>
                        <div>0927 - 780 - 4359</div>
                    </div>
                    <div className="inline-flex items-center h-auto w-full border-solid border-2 md:border-5 border-green-600 rounded-3xl p-4 md:pb-5 md:pt-5 font-bold text-base md:text-xl">
                        <div className="w-12 h-12 md:w-15 md:h-15 flex items-center justify-center mr-4 md:mr-7.5 ml-2 md:ml-7.5 flex-shrink-0">
                            <Mail className="w-8 h-8 md:w-12 md:h-12"/>
                        </div>
                        <div className="break-all">reygenbadidles28@yahoo.com</div>
                    </div>
                </div>
                    
                {/* location area */}
                <div className="w-full lg:w-1/2 content-center justify-items-center h-auto">
                    <div className="border-solid border-green-600 border-5 p-2 md:p-2.5 w-full max-w-lg lg:max-w-none lg:w-125 lg:h-125 h-64 md:h-96 m-2 md:m-5 rounded-3xl">
                        <iframe className="rounded-2xl"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3832.4486643189503!2d119.97446347584498!3d16.14579696857819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3393dd7d4b16767f%3A0x7a58257bb994a610!2sQuadro%20pizza!5e0!3m2!1sen!2sph!4v1749373326299!5m2!1sen!2sph"
                        width="100%"
                        height="100%"
                        style={{ border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                        title="Quadros Pizza Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default Contacts;