import { Container, Spinner } from "solid-bootstrap";

const LoadingSpinner = () => (
    <Container class="h-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status" variant="primary"><span class="visually-hidden">Loading...</span></Spinner>
    </Container>
)
export default LoadingSpinner;