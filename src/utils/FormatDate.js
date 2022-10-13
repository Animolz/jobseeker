import {format} from 'date-fns'

const FormatDate =  {
    fFullDate(value) {
        return format(new Date(value), 'dd/MM/yyyy');
    },

    fDateTime(value) {
        return format(new Date(value), 'dd/MM/yyyy hh:mm:ss');
    },

    fDate(value) {
        return format(new Date(value), 'dd');
    },

    fMonth(value) {
        return format(new Date(value), 'MM');
    },

    fYear(value) {
        return format(new Date(value), 'yyyy');
    },
} 

export default FormatDate