import { okaytoLogo } from '../../assets/images';
import { footerLinks } from '../../constants';

const Footer = () => {
    return (
        <footer className="mt-auto bg-secondary-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap items-start justify-evenly gap-10 max-lg:flex-col">
                    <div className="flex flex-col items-start">
                        <a href="/">
                            <img
                                src={okaytoLogo}
                                alt="logo"
                                width={150}
                                height={46}
                                className="m-0"
                            />
                        </a>
                        <p className="mt-6 font-montserrat text-base font-semibold leading-7 text-secondary-500 sm:max-w-sm">
                            Specializes in providing high-quality, stylish products for your
                            wardrobe.
                        </p>
                        <div className="mt-8 flex items-center gap-5">
                            {/* {socialMedia.map((icon) => (
              <div
                className='flex justify-center items-center w-12 h-12 bg-white rounded-full'
                key={icon.alt}
              >
                <img src={icon.src} alt={icon.alt} width={24} height={24} />
              </div>
            ))} */}
                        </div>
                    </div>

                    <div className="flex w-full flex-1 flex-wrap gap-20 lg:gap-10">
                        {footerLinks.map((section) => (
                            <div className="flex-1" key={section.title}>
                                <h4 className="mb-6 font-montserrat text-2xl font-semibold  uppercase leading-normal text-secondary-700">
                                    {section.title}
                                </h4>
                                <ul>
                                    {section.links.map((link) => (
                                        <li
                                            className="font-montserrat text-base font-semibold leading-7 text-secondary-500"
                                            key={link.name}
                                        >
                                            <a href={link.link}>{link.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="my-8 h-[2px] rounded-xl border-0 bg-secondary-900/30" />

                <div className="text-white-300 max-sm:flex-col max-sm:items-center">
                    <p className="text-center font-montserrat text-base font-semibold leading-normal text-secondary-500">
                        Copyright &copy; 2023 Okayto. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
