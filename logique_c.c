#include <stdio.h>

int main() {
    int bonnes_reponses[3] = {1, 1, 0};
    int choix, score = 0;

    for (int i = 0; i < 3; i++) {
        printf("Question %d - Entrez votre choix : ", i + 1);
        scanf("%d", &choix);

        if (choix == bonnes_reponses[i]) {
            score++;
        }
    }

    printf("Score final : %d / 3\n", score);
    return 0;
}
