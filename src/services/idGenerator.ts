import { v4 } from "uuid";

export function generatedId(): string {
    return v4()
}