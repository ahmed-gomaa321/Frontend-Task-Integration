import ReactQueryProvider from "./components/react-query.provider";

type AppProvidersProps = {
  children: React.ReactNode;
};
export default function AppProviders({ children }: AppProvidersProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
