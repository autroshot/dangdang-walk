import { fetchAddress } from '@/api/map';
import { fetchAirGrade } from '@/api/weather';
import { Position } from '@/models/location.model';
import { getSidoCode } from '@/utils/geo';
import { useQuery } from '@tanstack/react-query';

const useAddressAndAirgrade = (position: Position | null) => {
    const {
        data: addressData,
        error: addressError,
        isLoading: isAdressLoading,
    } = useQuery({
        queryKey: ['address'],
        queryFn: async () => {
            if (!position) return;
            return await fetchAddress(position.lat, position.lng);
        },
        enabled: !!position,
        staleTime: 7200,
    });

    const sidoName = addressData?.region_1depth_name;
    const {
        data: airGradeData,
        isPending: isAirGradePending,
        error: airGradeError,
    } = useQuery({
        queryKey: ['airGrade', position?.lat, position?.lng],
        queryFn: async () => {
            if (!sidoName) return;
            const sido = getSidoCode(sidoName);
            const data = await fetchAirGrade(sido);
            return data;
        },
        enabled: !!sidoName,
        staleTime: 7200,
    });

    return {
        airGrade: airGradeData?.khaiGrade,
        address: addressData?.region_3depth_name,
        isAdressLoading,
        isAirGradePending,
        addressError,
        airGradeError,
    };
};

export default useAddressAndAirgrade;
