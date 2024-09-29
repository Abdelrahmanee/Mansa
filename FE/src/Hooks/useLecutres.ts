import { useQuery } from "@tanstack/react-query";
import { getLectures } from "../utils/api";
import { AllLectureResponse } from "../utils/types";

// hooks/useLectures.ts
const useLectures = () => {
  return useQuery<{ data: AllLectureResponse[], message: string }>({
    queryKey: ['lectures'],
    queryFn: async () => {
      const res = await getLectures();
      return res;
    },
    // staleTime: 600,
    refetchInterval: 10000,
  });
};

export default useLectures;
