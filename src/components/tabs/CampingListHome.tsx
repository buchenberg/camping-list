import { Container, Row } from "solid-bootstrap";
import { useTransContext } from "@mbarzda/solid-i18next";


export default function CampingListHome() {
    const [t] = useTransContext();
    return (
        <Container>
            <Row>
                <h2>{t("welcome_message")}</h2>
                <h3><small class="text-muted">This is a proof-of-concept</small></h3>
                <p>Hey. This is a paragraph.</p>
            </Row>
        </Container>
    )


};