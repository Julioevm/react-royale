import React from "react";
import renderer from "react-test-renderer";
import Winner from "../../components/Winner";
import { player1 } from "../__fixtures__/players";

describe("<Winner/>", () => {
	it("renders", () => {
		const wrapper = renderer
			.create(<Winner winner={player1} show={true} onClose={() => {}} />)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
