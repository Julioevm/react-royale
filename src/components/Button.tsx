import React from "react";
import "./Style.scss";

interface Props {
	onClick: () => void;
	text: string;
}

export default function Button({ onClick, text }: Props) {
	return (
		<button onClick={onClick} type="button">
			{text}
		</button>
	);
}
