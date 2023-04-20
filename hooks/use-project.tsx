import { useParams } from "next/navigation"
import useSWR from "swr";
import { ProjectProps } from "@/lib/types";
import { fetcher } from "@/lib/utils";


export default function useProject() {
  const params = useParams();

  const { slug } = params as {
    slug: string;
  };

  
  const { data: project, error } = useSWR<ProjectProps>(
    slug && `/api/projects/${slug}`,
    fetcher,
    {
      dedupingInterval: 30000,
    },
  );

  console.log(project)
  console.log(error)

  return {
    project,
    error,
  };
}