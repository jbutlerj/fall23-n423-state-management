import React from "react";
import useAppState from "@/useHooks/useAppState";
import { Grid, Button, Header, Image } from "semantic-ui-react";
import Link from "next/link";

export default function Favorites() {
    const appState = useAppState();

    function changeName() {
        const titles = ["Tall", "Short", "Old"];
        const randomTitleIndex = Math.floor(Math.random() * titles.length);

        appState.updateAppState({
            user: `Jerry the ${titles[randomTitleIndex]} Guy`,
        });
    }

    // const router = useRouter();

    return (
        <>
            <Grid columns={1}>
                <Grid.Column>
                    <Header as="h1">{appState.user}'s Favorites</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button
                        content="Change Name"
                        color="purple"
                        icon="sync"
                        onClick={changeName}
                    />
                </Grid.Column>
                <Grid.Row columns="5">
                    {appState.favoriteDogs.map((dog) => {
                        return (
                            <Image
                                key={dog.id}
                                src={dog.url}
                                as={Link}
                                href={`/dogs/${dog.id}`} // dynamic link to dog detail page based off dog ID
                            />
                        );
                    })}
                </Grid.Row>
            </Grid>
        </>
    );
}
