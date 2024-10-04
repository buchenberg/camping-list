import { useTransContext } from "@mbarzda/solid-i18next";
import i18next from "i18next";
import { Form } from "solid-bootstrap";
import { For } from "solid-js";
import { campingItemStore } from "../store/campingItemStore";
import { IPersistedCampingItem } from "../store/types";

const LanguageSwitcher = () => {
    const [t, { changeLanguage }] = useTransContext();

    function handleLanguageChange(event: { target: { value: string; }; }) {
        changeLanguage(event.target.value);
    }

    return (
        <div>
        <Form.Select value={i18next.language} onChange={handleLanguageChange} >
            <option value="en-US">en-US</option>
            <option value="es-ES">es-ES</option>
        </Form.Select>
        </div>
    );
};

export default LanguageSwitcher;