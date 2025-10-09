export default function Page () {
const { data, isLoading, isError } = useQuery (E
queryFn: fetchData,
querykey: ["data"],
}) ;
if (isLoading) {
return ‹div›Loading...‹/div>;
}
if (isError) {
return ‹div>Something went wrong‹/div›;
}
return ‹div›{data}</div›;
}
