import { Box, Divider, TextField } from "@mui/material";
import { Fragment, cloneElement, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Autocomplete from "@mui/material/Autocomplete";

type Props = {
	renderInput: React.ReactElement;
	option: OptionList[];
};

type OptionList = {
	label: string;
	year: number;
};

const ComboBox = ({ renderInput, option }: Props) => {
	const [showList, setShowList] = useState<Boolean>(false);
	const [filteredData, setFilteredData] = useState<OptionList[]>([]);
	const [searchData, setSearchData] = useState<string>("");

	const searchFromList = (target: string) => {
		return option.filter((e: OptionList) => e.label.toLowerCase().includes(target.toLowerCase()));
	};

	const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setShowList(true);
		setSearchData(e.target.value);
		setFilteredData(searchFromList(e.target.value));
	};

	const onSelect = (selectedValue: string) => {
		setSearchData(selectedValue);
	};
	const onBlur = () => {
		setTimeout(() => {
			setShowList(false);
		}, 150);
	};

	return (
		<Box style={{ position: "relative", width: "100%" }}>
			{cloneElement(renderInput, {
				value: searchData,
				onChange: changeValue,
				onBlur: onBlur,
			})}
			{showList && (
				<List
					sx={{
						position: "absolute",
						background: "#f1f1f1",
						width: "100%",
						border: "1px solid #cdcdcd",
						"&:hover": {
							background: "#fff",
							cursor: "pointer",
						},
					}}
				>
					{filteredData.map((list: OptionList, index: number) => (
						<Fragment key={index}>
							<ListItem style={{ padding: "5px 15px" }} disablePadding onClick={() => onSelect(list.label)}>
								{list.label}
							</ListItem>
							<Divider />
						</Fragment>
					))}
				</List>
			)}
		</Box>
	);
};

export default ComboBox;
