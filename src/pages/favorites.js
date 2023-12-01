import React from "react";
import useAppState from "@/useHooks/useAppState";
import { Grid } from "semantic-ui-react";
import DogFav from "@/components/DogFav";
import { useRouter } from "next/router";
import styles from "@/styles/Favorites.module.css";

export default function Favorites() {
    const appState = useAppState();
    const router = useRouter();

    function changeName() {
        const titles = ["Tall", "Short", "Old"];
        const randomTitleIndex = Math.floor(Math.random() * titles.length);

        appState.updateAppState({
            user: `Jerry the ${titles[randomTitleIndex]} Guy`,
        });
    }

    return (
        <>
            <div className={styles.subheading}>
                <h3>Select any of your favorites to see more details.</h3>
            </div>
            <div className={styles.imageGrid}>
                <Grid columns="1">
                    {/* <Grid.Column>
                    <Header as="h1">{appState.user}'s Favorites</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        content="Change Name"
                        color="purple"
                        icon="sync"
                        onClick={changeName}
                    />
                </Grid.Column> */}
                    <Grid.Row columns="5">
                        {appState.favoriteDogs.map((dog) => {
                            return (
                                <DogFav
                                    key={dog.id}
                                    src={dog.url}
                                    onClick={() =>
                                        router.push(`/dogs/${dog.id}`)
                                    }
                                />
                            );
                        })}
                    </Grid.Row>
                </Grid>
            </div>
        </>
    );
}
