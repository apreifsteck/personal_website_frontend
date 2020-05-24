import React, { useState, useReducer } from "react";

import { Grid, Container, Typography } from "@material-ui/core";
import styles, { animationDuration } from "./styles";
import classnames from "classnames";

const AboutMe = (props) => {
	const [professional, toggleProfessional] = useState(undefined);
	const [professionalSrc, goofySrc] = ["profilepic.jpeg", "wakaju.jpg"];
	const [imgSrc, setImgSrc] = useState(professionalSrc);
	const imgClick = () => {
		setTimeout(() => {
			if (professional === undefined) {
				setImgSrc(goofySrc);
			} else {
				setImgSrc(professional ? professionalSrc : goofySrc);
			}
			// }, animationDuration / 2);
		}, 60);
		toggleProfessional(!professional);
	};

	const classes = styles(props);
	return (
		<Container>
			<Grid container direction="column">
				<Grid item xs={12}>
					<Typography variant="h2" align="left" gutterBottom>
						About Me
					</Typography>
				</Grid>
				<Grid item container spacing={3}>
					<Grid item xs={3}>
						<img
							src={imgSrc}
							className={classnames(classes.profilePic, {
								[classes.flipImage]: professional === true,
								[classes.unflipImage]: professional === false,
							})}
							onClick={imgClick}
						/>
					</Grid>
					<Grid item xs={9}>
						<Typography
							variant="body1"
							align="left"
							component="div"
						>
							<Typography gutterBottom>
								"<strong>So tell me about yourself</strong>",
								says an interviewer. That's a loaded question.
								There is a volley of different answers to that
								one. They range from a glaringly idyllic and
								grossly exaggerated: "I'm a self-starting,
								go-getting, motivated, detail-oriented, code
								crusher!" to humble to the point of
								self-deprication: "I'm nobody, really".
							</Typography>
							<Typography gutterBottom>
								None of that is true.
							</Typography>
							<Typography gutterBottom>
								The truth is that I'm just a regular dude. I
								work hard when I enjoy the work, I procrastinate
								when I don't. I take pride in a job well done,
								but I give up when the costs aren't worth it. I
								like spending time with my friends and diving
								into my hobbies.{" "}
								<i>I'm not special in any way.</i>
							</Typography>
							<Typography>
								If you look at my profile picture, you will see
								me at the most professional I've ever looked.
								Clean shaven, a new-ish haircut, a suit and a
								tie. If you click on my profile picture, you
								will see me at my most unprofessional. Raw egg
								in my hair and the rest of my body is covered in
								chocolate syrup and spaghetti sauce. Personally
								I prefer the latter.
							</Typography>
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="body1"
							align="left"
							component="div"
						>
							<Typography>
								My point is that no matter how you slice it,
								you're not going to get the truth, because
								you're taking a slice, and not the whole thing.
								A partial truth is not the truth. So, this is my
								poor attempt to describe myself in a way that I
								don't feel like I'm able to do in spoken words,
								especially in interviews.
							</Typography>
							<Typography>
								I like computer science because it's
								interesting. It has mind-bending problems and
								everything is so tidy. So mathematical. So
								logical (go figure). You can start from the
								ground and build anything you want to because in
								the end computers let us build whatever we
								imagine. It just becomes a technical endeavor of
								how to do it. If you want a laundry list of
								skills, you can look at my résumé. This is how I
								feel.
							</Typography>
							<Typography gutterBottom>
								Anyway, I'm not just a code monkey. I believe
								that rock climbing is the best drug and I have
								recently gotten into learning piano and drawing
								as well. I also like fixing up bikes. Sometimes
								I feel like I'm pulling myself in a ton of
								different directions but everything is so much
								fun, I don't want to give anything up. I can't
								claim I'm good at all these things, but I'm not
								doing them to be good. I'm doing them because
								they're cool and to enjoy the road to progress.
								I'll probably post some samples of my stuff when
								I get the API for this thing built out a little
								more.
							</Typography>
							<Typography>
								That's all I really have to say about me. Not
								much, right? Fits completely onto the screen of
								my laptop. But I said it, didn't I? I'm not
								special. I'm just trying to make my way in an
								uncertain world the best I know how. My "goal",
								my only driving ambition is to live my life so
								that one day, hopefully a long time from now, I
								can look back at a long road well traveled and
								smile when I think of the places I've been.
							</Typography>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
export default AboutMe;
