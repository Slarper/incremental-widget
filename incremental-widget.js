import { app } from "../scripts/app.js";
import {ComfyWidgets} from "../scripts/widgets.js"

function indexWidget(node, inputName, inputData) {
	const index = ComfyWidgets.INT(node, inputName, inputData);
	const increment = node.addWidget("toggle", "increment after every gen", true, function (v) {}, {
		on: "enabled",
		off: "disabled",
		serialize: false, // Don't include this in prompt.
	});

	increment.afterQueued = () => {
		if (increment.value) {
			index.widget.value += 1;
		}
	};

	return { widget: index, randomize: increment };
}

export const IncrementalWidgets = {
        "INT:index": indexWidget,
}

const ext = {
	// Unique name for the extension
	name: "Slarper.IncrementalWidget",
	async getCustomWidgets(app) {
                return IncrementalWidgets;
	}
};

app.registerExtension(ext);
