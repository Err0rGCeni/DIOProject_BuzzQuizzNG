import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title: string = ""
  questions: any
  questionSelected: any
  alignments: { [key: string]: number } = {}
  questionIndex: number = 0
  questionMaxIndex: number = 0
  finished: boolean = false
  finalAnswer: string = ""

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value: string) {
    if (!this.alignments[value]) {
      this.alignments[value] = 1
    } else {
      this.alignments[value] += 1
    }
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAlignment = this.checkResult(this.alignments)
      this.finished = true
      this.finalAnswer = quizz_questions.results[finalAlignment as keyof typeof quizz_questions.results]
    }
  }

  checkResult(alignments: { [key: string]: number }) {
    let maxAlignment = ""
    let maxValue = 0

    for (const alignment in alignments) {
      if (alignments.hasOwnProperty(alignment)) {
        if (alignments[alignment] > maxValue) {
          maxValue = alignments[alignment]
          maxAlignment = alignment
        }
      }
    }

    return maxAlignment
  }
}
