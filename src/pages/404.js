import React from "react";


export default function NotFoundPage(props) {
	return (
		<>
			<div
				className="margin flex-con flex-center fluid"
				style={{ minHeight: "50%" }}
			>
				<div
					className="flex-con flex-center"
					style={{ minHeight: "50%" }}
				>
					<section
						className="flex-con flex-center"
						style={{ maxWidth: "750px" }}
					>
						<div className="flex-item-4">
							<i
								size="massive"
								style={{
									borderRadius: "999px",
									backgroundColor: "#d26f1c",
									width: "165px",
									height: "165px",
									paddingTop: "1rem",
								}}
							>
								<i name="user secret" style={{ paddingLeft: "26px" }} />
								<i
									corner="bottom right"
									name="times circle"
									style={{
										borderRadius: "999px",
										padding: "2rem",
										paddingTop: "0.2rem",
										height: "65px",
										width: "65px",
										paddingLeft: "0.2rem",
										backgroundColor: "white",
										color: "#d26f1c",
									}}
								/>
							</i>
							<h2
								id="blogDes"
								as="h1"
								className={"text-center gluid margin-top"}
							>
								404
							</h2>
						</div>
						<p
							className="flex-item-4 margin-top border padding text-center margin-bottom"
							style={{ maxWidth: "450px" }}
						>
							Die gesuchte Seite wurde nicht gefunden, oder ist nicht mehr
							verfügbar.
							<div className="flex-item-4" />
							<p className="flex-item-4">
								<strong>
									<a href="print-und-screendesign">Startseite</a>
								</strong>
							</p>
						</p>
					</section>
				</div>
			</div>
		</>
	);
}
