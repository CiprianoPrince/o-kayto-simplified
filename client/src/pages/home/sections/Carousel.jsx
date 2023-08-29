import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

import { carousel1, carousel2 } from '../../../assets/images';

const Carousel = () => {
    return (
        <Swiper
            className="h-[20rem]"
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
        >
            <SwiperSlide>
                <img className="oblect-center w-full object-cover" src={carousel1} />
            </SwiperSlide>

            <SwiperSlide>
                <img className="oblect-center w-full object-cover" src={carousel2} />
            </SwiperSlide>

            <SwiperSlide>
                <img className="oblect- w-full   object-cover" src={carousel1} />
            </SwiperSlide>

            <SwiperSlide>
                <img className="oblect-center w-full   object-cover" src={carousel1} />
            </SwiperSlide>
        </Swiper>
    );
};

export default Carousel;
