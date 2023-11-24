import Link from "next/link";
// import Image from "next/image";
import { useRouter } from "next/router";

import Seo from "../components/Seo";

export default function Home({ results }) {
	const router = useRouter();
	const onClick = (id) => {
		router.push(`/billionaires/${id}`);
	};

	return (
		<div className="container">
			<Seo title="Home" />
			{results?.map((result) => {
				if (result.squareImage)
					return (
						<div
							onClick={() => onClick(result.id)}
							className="billionaire"
							key={result.id}
						>
							<img alt={result.name} src={result.squareImage} />
							<h4>
								<Link href={`/billionaires/${result.id}`}>
									<a>{result.name}</a>
								</Link>
							</h4>
							<h5>
								{result.netWorth} / {result.industries[0]}
							</h5>
						</div>
					);
			})}
			<style jsx>{`
				.container {
					color: white;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					padding: 20px;
					gap: 20px;
				}
				.billionaire {
					cursor: pointer;
				}
				.billionaire img {
					max-width: 100%;
					border-radius: 12px;
					transition: transform 0.2s ease-in-out;
					box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
				}
				.billionaire:hover img {
					transform: scale(1.05) translateY(-10px);
				}
				.billionaire h4 {
					font-size: 14px;
					font-weight: 400;
					line-height: 100%;
					text-align: left;
				}
				.billionaire h5 {
					font-size: 10px;
					font-weight: 100;
					text-align: left;
					line-height: 100%;
					margin-bottom: 20px;
				}
			`}</style>
		</div>
	);
}

export async function getServerSideProps() {
	const res = await fetch(`http://localhost:3000/api/billionaires`);
	const results = await res.json();
	// console.log(results);
	return {
		props: {
			results,
		},
	};
}
