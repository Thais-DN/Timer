import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>history</h1>

            <ScrollArea.Root>
                <ScrollArea.Viewport
                    style={{
                        height: 480,
                        overflowX: "scroll",
                    }}
                >
                    <HistoryList>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tarefa</th>
                                    <th>Duração</th>
                                    <th>Inicio</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cycles.map((cycle) => {
                                    return (
                                        <tr key={cycle.id}>
                                            <td>{cycle.task}</td>
                                            <td>
                                                {cycle.minutesAmount} minutos
                                            </td>
                                            <td>
                                                {formatDistanceToNow(
                                                    new Date(cycle.startDate),
                                                    {
                                                        addSuffix: true,
                                                        locale: ptBR,
                                                    }
                                                )}
                                            </td>
                                            <td>
                                                {cycle.finishedDate && (
                                                    <Status statusColor="green">
                                                        Concluido
                                                    </Status>
                                                )}

                                                {cycle.interruptedDate && (
                                                    <Status statusColor="red">
                                                        Interrompido
                                                    </Status>
                                                )}

                                                {!cycle.finishedDate &&
                                                    !cycle.interruptedDate && (
                                                        <Status statusColor="yellow">
                                                            Andamento
                                                        </Status>
                                                    )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </HistoryList>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="horizontal">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation="vertical">
                    <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
            </ScrollArea.Root>
        </HistoryContainer>
    );
}
