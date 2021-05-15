import React, { useRef, useState } from "react";

import {
	Grid,
	GridList,
	GridListTile,
	GridListTileBar,
} from "@material-ui/core";
import {
	Paper,
	Container,
	Typography,
	IconButton,
} from "@material-ui/core";
import { Button, ButtonGroup } from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import styles from "./styles";

const Home = (props) => {
	const [scrollPercent, updateScrollPercent] = useState(0);
	window.addEventListener("scroll", () => {
		const height =
			document.documentElement.offsetHeight - window.innerHeight;
		updateScrollPercent(window.scrollY / height);
	});

	const classes = styles(props);
	const bottomEl = useRef();

	const toggleScroll = () => {
		if (scrollPercent <= 0.5) {
			bottomEl.current.scrollIntoView({ behavior: "smooth" });
		} else {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	};

	const gridListTiles = [
		{
			title: "React",
			src: "logo192.png",
			alt: "React logo"
		},
		{
			title: "Material UI",
			src: "material-ui_logo.svg",
			alt: "Material UI logo"
		},
		{
			title: "Phoenix",
			src: "phoenix_logo.svg",
			alt: "Phoenix logo"
		},

		{
			title: "Docker",
			src: "docker_logo.png",
			alt: "Docker logo"
		},
	].map((item) => (
		<GridListTile key={item.src}>
			<img className={classes.gridItem} src={item.src} alt={item.alt} />
			<GridListTileBar title={item.title} />
		</GridListTile>
	));
	return (
		<Grid container direction="column">
			<Grid
				spacing={10}
				container
				direction="column"
				className={classes.panel_top}
			>
				<Grid item>
					<Container>
						<Typography gutterBottom variant="h2" align="left">
							Welcome to my website!
						</Typography>
						{/* <Divider variant="middle" /> */}
						<Typography align="left" variant="body1" gutterBottom>
							Hi. This is my website. I put it together for one
							reason: In a world where everyone is trying to put
							their best foot forward, I wanted to put my real one
							forward.
						</Typography>
						<Typography align="left" variant="body1">
							What I mean is, this website is my way of expressing
							myself. Authentically. Sucking up is for résumés.
							Don't worry, I've got one of those here too, because
							I'm just like everyone else.
						</Typography>
					</Container>
				</Grid>

				<Grid item>
					<ButtonGroup
						size="large"
						color="primary"
						aria-label="large outlined primary button group"
					>
						<Button>About Me</Button>
						<Button>Blog</Button>
						<Button>Art</Button>
						<Button>Trashcan</Button>
					</ButtonGroup>
				</Grid>
				<Grid item>
					<IconButton
						className={classes.buttons}
						onClick={toggleScroll}
						style={{
							transform: `rotate(${scrollPercent * 180}deg)`,
						}}
					>
						<ExpandMoreIcon style={{ fontSize: 60 }} />
					</IconButton>
				</Grid>
			</Grid>
			<Grid
				item
				container
				direction="column"
				className={classes.panel_bottom}
			>
				<Paper className={classes.paper} square>
					<Grid item>
						<Typography variant="h5" gutterBottom>
							This website was built with these technologies:
						</Typography>
					</Grid>
					<Grid item container justify="center">
						<GridList
							spacing={40}
							className={classes.gridList}
							cols={4}
						>
							{gridListTiles}
						</GridList>
					</Grid>
					<Grid item>
						<Typography>
							Eventually, I'm going to upload the API I used to
							back this project onto Github. One day.
						</Typography>
					</Grid>
				</Paper>
			</Grid>
			<div ref={bottomEl}></div>
		</Grid>
	);
};
export default Home;
