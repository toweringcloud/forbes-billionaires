// import Image from "next/image";
import { useRouter } from "next/router";

import Seo from "../../components/Seo";

export default function Detail({ result }) {
	const router = useRouter();
	return (
		<div className="container">
			<Seo title={result.name} />
			<img alt={result.name} src={result.squareImage} />
			<h3>{result.name}</h3>
			<ul>
				<li>NetWorth : {result.netWorth}</li>
				<li>Country : {result.country}</li>
				<li>Industry : {result.industries[0]}</li>
			</ul>
			<h4>{result.bio.join(" ")}</h4>
			<hr></hr>
			<h3>Finalcial Assets</h3>
			<div className="assets">
				{result.financialAssets.map((asset) => (
					<ul key={asset.numberOfShares}>
						<li>Ticker : {asset.ticker}</li>
						<li>Shares : {asset.numberOfShares}</li>
						<li>Share Price : {asset.sharePrice}</li>
					</ul>
				))}
			</div>
			<style jsx>{`
				.container {
					color: white;
					display: flex;
					flex-direction: column;
					padding: 20px;
					text-align: left;
				}
				.assets {
					color: white;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 20px;
				}
				img {
					max-width: 50%;
				}
				h3 {
					font-size: 24px;
					font-weight: 600;
					line-height: 100%;
				}
				h4 {
					font-size: 16px;
					font-weight: 400;
					line-height: 100%;
				}
			`}</style>
		</div>
	);
}

export async function getServerSideProps({ params: { params } }) {
	const [id] = params || [];
	const res = await fetch(`http://localhost:3000/api/billionaires/${id}`);
	const result = await res.json();
	// console.log(result);
	return {
		props: {
			result,
		},
	};
}
