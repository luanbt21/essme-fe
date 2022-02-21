import { Footer } from "~/models/Footer";
import { Event } from "~/models/Event";
import { Field } from "~/models/Field";
import { Experts } from "~/models/Experts";

export interface Homepage {
    top_events: Event[];
    fields: Field[];
    top_experts: Experts[];
    Footer: Footer;
}