import { twMerge } from 'tailwind-merge';

const cn = (...classes) => twMerge(...classes);

export default cn;
